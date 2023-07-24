import saleAm from "../../../../../assets/pdfs/am/sale.pdf";
import saleEn from "../../../../../assets/pdfs/en/sale.pdf";
import saleRu from "../../../../../assets/pdfs/ru/sale.pdf";

export const lngs = [
  {
    id: 1,
    value: "am",
    name: "ՀՅ",
  },
  {
    id: 2,
    value: "en",
    name: "EN",
  },
  {
    id: 3,
    value: "ru",
    name: "РУ",
  },
];

export const pdfAm = [
  {
    id: "pdfAm1",
    name: "Վաճառքի ցուցադրման պայմանագիր.pdf",
    file: saleAm,
  },
  //   {
  //     id: "pdfAm2",
  //     name: "Sales Services Agreement",
  //     file: saleEn,
  //   },
  //   {
  //     id: "pdfAm3",
  //     name: "Договор услуг по продажам",
  //     file: saleRu,
  //   },
];

export const pdfEn = [
  //   {
  //     id: "pdfEn1",
  //     name: "Վաճառքի_ցուցադրության_պայմանագիր",
  //     file: saleAm,
  //   },
  {
    id: "pdfEn2",
    name: "Sales Services Agreement.pdf",
    file: saleEn,
  },
  //   {
  //     id: "pdfEn3",
  //     name: "Договор услуг по продажам",
  //     file: saleRu,
  //   },
];

export const pdfRu = [
  //   {
  //     id: "pdfRu1",
  //     name: "Վաճառքի_ցուցադրության_պայմանագիր",
  //     file: saleAm,
  //   },
  //   {
  //     id: "pdfRu2",
  //     name: "Sales Services Agreement",
  //     file: saleEn,
  //   },
  {
    id: "pdfRu3",
    name: "Договор услуг по продажам.pdf",
    file: saleRu,
  },
];
