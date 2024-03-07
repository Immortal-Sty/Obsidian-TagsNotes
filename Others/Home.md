---
ctime: 2024-03-01T23:21:03
mtime: 2024-03-07T21:31:37
---

# Home

## 临时速记

```dataview
table without id
	regexreplace(L.text, "\s+\(ctime :: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\)|\s*\#[^ ]+($| \s*)", "") as "内容",
	dateformat(L.ctime, "yyyy/MM/dd<br>HH:mm:ss") as "创建时间"
where file.path = "Others/Temp.md"
flatten file.lists as L
sort L.ctime desc
```