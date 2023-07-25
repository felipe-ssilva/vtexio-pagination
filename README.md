# VTEX Search Result Pagination for VTEX IO

A classic pagination component for VTEX IO.

![Alt text](image.png)

Example of implementation:
```json
{
  "search-result-layout.desktop": {
    "children": [
      "flex-layout.row#search.navigation-bar",
      "flex-layout.row#search.banner-main",
      "flex-layout.row#search.gallery",
      "search-result-pagination"
    ],
    "props": {
      "preventRouteChange": false,
      "mobileLayout": {
        "mode1": "small",
        "mode2": "normal"
      }
    }
  }
}
```