검색 시 다이나믹 쿼리 사용할때

<!-- 지양 -->

```
axios.get(`/auction?page=${page}&search=${search}`)
```

<!-- 지향 -->

```
const params = new URLSearchParams({ page: 0, search: "jack" });

const axios.get(`/url/${params.toString()}`);

// params.toString() // 'page=0&search=jack'
```
