import base64, re, sys, pathlib
root = pathlib.Path(__file__).parent
imgs = root.parent / "version-anterior" / "public" / "images"
logo = pathlib.Path(sys.argv[1])
s = (root / "template.html").read_text(encoding="utf-8")
b64 = lambda p: base64.b64encode(p.read_bytes()).decode()
s = s.replace("__LOGO__", "data:image/png;base64," + b64(logo))
s = re.sub(r"__IMG:([\w-]+)__", lambda m: "data:image/avif;base64," + b64(imgs / (m.group(1) + ".avif")), s)
(root / "max-torrado-propuesta.html").write_text(s, encoding="utf-8")
print(len(s)//1024, "KB")
