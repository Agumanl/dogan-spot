"use client";

import { useState } from "react";
import { htmlToBlocks } from "@portabletext/block-tools";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  Stack,
  Text,
  TextArea,
} from "@sanity/ui";
import {
  insert,
  PatchEvent,
  set,
  setIfMissing,
  type ArrayOfObjectsInputProps,
} from "sanity";

type BlockContentType = Parameters<typeof htmlToBlocks>[1];

/**
 * Şemada yalnızca Normal, H2, H3 ve Alıntı stilleri tanımlı.
 * Sayfada zaten bir H1 olduğu için H1 -> H2, H4-H6 -> H3 çevrilir.
 */
function normalizeHeadings(html: string): string {
  return html
    .replace(/<(\/?)h1(?=[\s>])/gi, "<$1h2")
    .replace(/<(\/?)h[4-6](?=[\s>])/gi, "<$1h3");
}

/**
 * "İçerik (Makale)" alanının üstüne "HTML kodundan içe aktar" düğmesi ekler.
 * Yapıştırılan HTML, Portable Text bloklarına (başlıklar, paragraflar, listeler,
 * kalın/italik, bağlantılar) çevrilir. Alanın normal düzenleyicisi aynen çalışmaya devam eder.
 */
export function HtmlImportInput(props: ArrayOfObjectsInputProps) {
  const { onChange, renderDefault, schemaType, readOnly } = props;

  const [open, setOpen] = useState(false);
  const [html, setHtml] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function close() {
    setOpen(false);
    setHtml("");
    setMessage(null);
  }

  function apply(mode: "append" | "replace") {
    const source = normalizeHeadings(html.trim());
    if (!source) {
      setMessage("Önce HTML kodunu kutuya yapıştırın.");
      return;
    }

    let blocks: unknown[];
    try {
      blocks = htmlToBlocks(source, schemaType as BlockContentType);
    } catch (error) {
      console.error("HTML dönüştürülemedi:", error);
      setMessage("HTML dönüştürülemedi. Kodun eksiksiz yapıştırıldığından emin olun.");
      return;
    }

    if (blocks.length === 0) {
      setMessage("Kodun içinde aktarılabilecek metin bulunamadı.");
      return;
    }

    if (mode === "replace") {
      onChange(PatchEvent.from(set(blocks)));
    } else {
      onChange(
        PatchEvent.from([setIfMissing([]), insert(blocks, "after", [-1])]),
      );
    }
    close();
  }

  return (
    <Stack space={3}>
      <Flex justify="flex-end">
        <Button
          text="HTML kodundan içe aktar"
          tone="primary"
          mode="ghost"
          fontSize={1}
          disabled={readOnly}
          onClick={() => setOpen(true)}
        />
      </Flex>

      {renderDefault(props)}

      {open && (
        <Dialog
          id="html-import-dialog"
          header="HTML kodundan içe aktar"
          width={2}
          onClose={close}
          footer={
            <Box padding={3}>
              <Flex gap={2} justify="flex-end" wrap="wrap">
                <Button text="Vazgeç" mode="bleed" onClick={close} />
                <Button
                  text="Mevcut içeriği değiştir"
                  tone="critical"
                  mode="ghost"
                  onClick={() => apply("replace")}
                />
                <Button
                  text="İçeriğin sonuna ekle"
                  tone="primary"
                  onClick={() => apply("append")}
                />
              </Flex>
            </Box>
          }
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text size={1} muted>
                Makalenin HTML kodunu aşağıya yapıştırın. Desteklenenler:
                başlıklar (h1-h6; h1 başlığı H2, h4-h6 ise H3 olur), paragraf,
                madde işaretli ve numaralı liste, kalın, italik, alıntı ve
                bağlantı. Görsel, tablo ve renk gibi biçimler aktarılmaz.
              </Text>

              <TextArea
                rows={14}
                value={html}
                onChange={(event) => {
                  setHtml(event.currentTarget.value);
                  setMessage(null);
                }}
                placeholder={"<h2>Başlık</h2>\n<p>Paragraf metni...</p>"}
                style={{ fontFamily: "monospace" }}
              />

              {message && (
                <Card padding={3} radius={2} tone="caution" border>
                  <Text size={1}>{message}</Text>
                </Card>
              )}
            </Stack>
          </Box>
        </Dialog>
      )}
    </Stack>
  );
}
