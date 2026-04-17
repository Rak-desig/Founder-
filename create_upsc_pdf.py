from pathlib import Path


def escape_pdf_text(text: str) -> str:
    return text.replace('\\', r'\\').replace('(', r'\(').replace(')', r'\)')


def make_upsc_pdf(output_path: Path) -> None:
    lines = [
        "UPSC Quick Guide",
        "",
        "UPSC stands for Union Public Service Commission.",
        "The Civil Services Examination has 3 stages:",
        "1) Preliminary Examination",
        "2) Main Examination",
        "3) Personality Test (Interview)",
        "",
        "Suggested preparation basics:",
        "- Read NCERT foundations",
        "- Follow current affairs daily",
        "- Practice answer writing",
        "- Solve previous year papers",
    ]

    content_lines = ["BT", "/F1 14 Tf", "50 800 Td"]
    first = True
    for line in lines:
        if first:
            content_lines.append(f"({escape_pdf_text(line)}) Tj")
            first = False
        else:
            content_lines.append("0 -24 Td")
            content_lines.append(f"({escape_pdf_text(line)}) Tj")
    content_lines.append("ET")

    stream_data = "\n".join(content_lines).encode("latin-1", errors="replace")

    objects = []
    objects.append(b"1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n")
    objects.append(b"2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n")
    objects.append(
        b"3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n"
    )
    objects.append(
        f"4 0 obj\n<< /Length {len(stream_data)} >>\nstream\n".encode("latin-1")
        + stream_data
        + b"\nendstream\nendobj\n"
    )
    objects.append(b"5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n")

    pdf = bytearray()
    pdf.extend(b"%PDF-1.4\n")

    offsets = [0]
    for obj in objects:
        offsets.append(len(pdf))
        pdf.extend(obj)

    xref_start = len(pdf)
    count = len(objects) + 1
    pdf.extend(f"xref\n0 {count}\n".encode("latin-1"))
    pdf.extend(b"0000000000 65535 f \n")
    for off in offsets[1:]:
        pdf.extend(f"{off:010d} 00000 n \n".encode("latin-1"))

    pdf.extend(
        f"trailer\n<< /Size {count} /Root 1 0 R >>\nstartxref\n{xref_start}\n%%EOF\n".encode(
            "latin-1"
        )
    )

    output_path.write_bytes(pdf)


if __name__ == "__main__":
    make_upsc_pdf(Path("UPSC.pdf"))
    print("Created UPSC.pdf")
