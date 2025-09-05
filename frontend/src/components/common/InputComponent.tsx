import { Input } from "antd";

const InputComponent = () => (
  <Input
    style={{ borderRadius: 0 }}
    // defaultValue="기본값"               // defaultValue: 초기 값 설정
    // value={value}                      // value: 제어 컴포넌트 값
    // onChange={e => setValue(e.target.value)}  // onChange: 값 변경 이벤트
    // disabled                         // disabled: 입력 비활성화
    // allowClear                      // allowClear: 입력 내용 지우기 아이콘 표시
    // maxLength={100}                 // maxLength: 입력 최대 문자 수 제한
    // prefix={<Icon />}               // prefix: 입력 앞쪽 아이콘 또는 노드 추가
    // suffix={<Icon />}               // suffix: 입력 뒤쪽 아이콘 또는 노드 추가
    // addonBefore="http://"           // addonBefore: 입력 전 레이블/노드
    // addonAfter=".com"               // addonAfter: 입력 후 레이블/노드
    // size="large"                    // size: "large" | "middle" | "small"
    // status="error"                  // status: "error" | "warning" (validation 상태)
    // type="text"                     // type: 기본 입력 타입 (MDN 참조)
    // showCount                       // showCount: 현재 입력 길이 표시 (antd v5.10+)
    // onPressEnter={e => console.log("Enter pressed")} // Enter 키 눌렀을 때 이벤트
    // onClear={() => console.log("Cleared")}           // 클리어 클릭 시 콜백 (v5.20+)
    // variant="outlined"              // variant: "outlined" | "borderless" | "filled" | "underlined" (v5.13+)
  />
);

export default InputComponent;
