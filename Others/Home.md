---
ctime: 2024-03-01T23:21:03
mtime: 2024-03-02T00:26:54
---

# Home

```dataview
table without id
	L.ctime as "创建时间",
	L.text as "内容"
where file.path = "Others/Temp.md"
flatten file.lists as L
```