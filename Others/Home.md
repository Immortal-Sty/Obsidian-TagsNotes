---
ctime: 2024-03-01T23:21:03
mtime: 2024-03-02T00:32:57
---

# Home

```dataview
table without id
	dateformat(L.ctime, "yyyy/MM/dd<br>HH:mm:ss") as "创建时间",
	regexreplace(L.text, "\s+\(ctime :: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\)$", "") as "内容"
where file.path = "Others/Temp.md"
flatten file.lists as L
```