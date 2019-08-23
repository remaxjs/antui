export default function fmtEvent(props: any, e: any) {
  const dataset: any = {};
  for (const key in props) {
    if (/data-/gi.test(key)) {
      dataset[key.replace(/data-/gi, '')] = props[key];
    }
  }
  return Object.assign({}, e, {
    currentTarget: { dataset },
    target: { dataset, targetDataset: dataset },
  });
}
