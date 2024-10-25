import Icon from "../components/Icon.js";

export const students = [
  {
    studentName: "Huynh Thai Khiem",
    studentID: "20IT911",
    studentCategory: "Good",
    countOfVerifiers: "3 approvals",
    studentGPA: "3.4",
    image: "/images/certificate/huynh-thai-khiem.png",
    image2x: "/images/certificate/huynh-thai-khiem.png",
    category: "green",
    categoryText: "Level 3 approved",
    url: "/",
    steps: [
      {
        step: <Icon name="check" size="14"  fill="#FFFFFF"/>,
        backgroundColor: "#9757D7" 
      },
      {
        step: <Icon name="check" size="14" fill="#FFFFFF"/>,
        backgroundColor: "#EF466F" 
      },
      {
        step: <Icon name="check" size="14" fill="#FFFFFF"/>,
        backgroundColor: "#45B26B" 
      },
    ],
  },
];
