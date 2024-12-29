import { PageTopic } from "@/models/topic";

export const convertPageToRequestData = (page: PageTopic) => {
  const { id, data } = page;
  let reqData = {
    ...page,
    id: id.length === 4 ? null : id,
    data: data ? JSON.stringify(data) : null,
  };
  return reqData;
};

export const convertPageFromResponseData = (page: any): PageTopic => {
  console.log("not convert", page);
  let res = {
    ...page,
    data: page.data ? JSON.parse(page.data) : null,
  };

  return res;
};
