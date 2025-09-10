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

tailwind css 디자인 토큰

```
Descriptions 은 Config 에서 contentStyle 조절하는게 안되는 듯함 직접
태그에서 조절하자

ex)
<Descriptions
  labelStyle={{ fontWeight: "bold", backgroundColor: "var(--table-head)" }}
  contentStyle={{ backgroundColor: "var(--card)" }}
>

```
