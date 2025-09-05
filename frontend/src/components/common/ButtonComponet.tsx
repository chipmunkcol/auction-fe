import { Button } from "antd";

const ButtonComponet: React.FC = () => {
  return (
    <Button
      type="primary"
      //     type: "default" | "primary" | "dashed" | "link" | "text"
      // size: "large" | "middle" | "small"
      // shape: "default" | "circle" | "round"
      // icon: ReactNode (아이콘 컴포넌트)
      // block: boolean (가로 100%)
      // disabled: boolean
      // danger: boolean (위험 강조색)
      // loading: boolean
      // ghost: boolean (투명 배경)
    >
      검색하기
    </Button>
  );
};

export default ButtonComponet;
