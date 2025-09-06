import {
  Button,
  DatePicker,
  Input,
  Radio,
  Select,
  type RadioChangeEvent,
} from "antd";
import type dayjs from "dayjs";
import { useState } from "react";
const { RangePicker } = DatePicker;

const 법원option = [
  { value: "서울지법전체", label: "서울지법전체" },
  { value: "서울중앙지법", label: "서울중앙지법" },
];

const 사건년도option = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
];

const 경매종류option = [
  { value: "전체", label: "전체" },
  { value: "임의경매", label: "임의경매" },
  { value: "강제경매", label: "강제경매" },
];

const 감정가option = [
  { value: 10, label: "1천만원" },
  { value: 100, label: "1억" },
  { value: 500, label: "5억" },
  { value: 1000, label: "10억억" },
];

const SearchTable = () => {
  const [법원, set법원] = useState("");
  const onChange법원 = (value: string) => {
    set법원(value);
    console.log("🚀 ~ onChange법원 ~ value:", value);
  };

  const [경매종류, set경매종류] = useState("전체");
  const onChange경매종류 = (e: RadioChangeEvent) => {
    set경매종류(e.target.value);
    console.log("🚀 ~ onChange경매종류 ~ e.target.value:", e.target.value);
  };

  const [매각기일, set매각기일] = useState<{
    start: dayjs.Dayjs | null;
    end: dayjs.Dayjs | null;
  }>({
    start: null,
    end: null,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="min-w-3xl border border-border">
        <div className="flex border-b border-border">
          <div className="flex flex-1 ">
            <div className="flex-1 flex items-center bg-table-head p-2">
              법원
            </div>
            <div className="flex-3 flex items-center p-2">
              <Select
                showSearch
                placeholder="본원전체"
                optionFilterProp="label"
                options={법원option}
                className="w-[150px]"
                onChange={onChange법원}
                value={법원}
              />
            </div>
          </div>
          <div className="flex flex-1">
            <div className="flex-1 flex items-center bg-table-head p-2">
              사건번호
            </div>
            <div className="flex-3 flex gap-2 p-2">
              <div>
                <Select
                  showSearch
                  placeholder="사건년도"
                  optionFilterProp="label"
                  options={사건년도option}
                  className="w-[100px]"
                />
              </div>
              <div className="flex gap-2">
                <div>타경</div>
                <div className="w-[100px]">
                  <Input />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 비슷한 구성 반복 */}
        <div className="flex border-b border-border">
          <div className="flex flex-1 ">
            <div className="flex-1 flex items-center bg-table-head p-2">
              소재지
            </div>
            <div className="flex-3 flex items-center p-2">전체</div>
          </div>
          <div className="flex flex-1">
            <div className="flex-1 flex items-center bg-table-head p-2">
              명칭검색
            </div>
            <div className="flex-3 p-2">
              <Input placeholder="소재지 또는 건물명칭 입력" />
            </div>
          </div>
        </div>

        {/* 비슷한 구성 반복 */}
        <div className="flex border-b border-border">
          <div className="flex flex-1 ">
            <div className="flex-1 flex items-center bg-table-head p-2">
              경매종류
            </div>
            <div className="flex-3 flex items-center gap-4 p-2">
              <Radio.Group
                options={경매종류option}
                value={경매종류}
                onChange={onChange경매종류}
              ></Radio.Group>
            </div>
          </div>
          <div className="flex flex-1">
            <div className="flex-1 flex items-center bg-table-head p-2">
              매각기일
            </div>
            <div className="flex-3 p-2">
              <DatePicker
                className="w-[120px]"
                onChange={(date) => set매각기일({ ...매각기일, start: date })}
              />
              <span>&nbsp; ~ &nbsp;</span>
              <DatePicker
                className="w-[120px]"
                onChange={(date) => set매각기일({ ...매각기일, end: date })}
              />
            </div>
          </div>
        </div>

        {/* 공시가격 */}

        {/* 비슷한 구성 반복 */}
        <div className="flex border-b border-border">
          <div className="flex flex-1 ">
            <div className="flex-1 flex items-center bg-table-head p-2">
              감정가
            </div>
            <div className="flex-3 flex items-center p-2">
              <Select
                showSearch
                placeholder="최소"
                optionFilterProp="label"
                options={감정가option}
                className="w-[100px]"
              />
              <span>&nbsp; ~ &nbsp;</span>
              <Select
                showSearch
                placeholder="최대"
                optionFilterProp="label"
                options={감정가option}
                className="w-[100px]"
              />
            </div>
          </div>
          <div className="flex flex-1">
            <div className="flex-1 flex items-center bg-table-head p-2">
              최저가
            </div>
            <div className="flex-3 flex items-center p-2">
              <Select
                showSearch
                placeholder="최소"
                optionFilterProp="label"
                options={감정가option}
                className="w-[100px]"
              />
              <span>&nbsp; ~ &nbsp;</span>
              <Select
                showSearch
                placeholder="최대"
                optionFilterProp="label"
                options={감정가option}
                className="w-[100px]"
              />
            </div>
          </div>
        </div>

        {/* 비슷한 구성 반복 */}
        <div className="flex border-b border-border">
          <div className="flex flex-1 ">
            <div className="flex-1 flex items-center bg-table-head p-2">
              건물면적
            </div>
            <div className="flex-3 flex items-center p-2">m ~ m</div>
          </div>
          <div className="flex flex-1">
            <div className="flex-1 flex items-center bg-table-head p-2">
              대지면적
            </div>
            <div className="flex-3 flex items-center p-2">m ~ m</div>
          </div>
        </div>

        {/* 비슷한 구성 반복 */}
        <div className="flex ">
          <div className="flex flex-1 ">
            <div className="flex-1 flex items-center bg-table-head p-2">
              유찰수
            </div>
            <div className="flex-3 flex items-center p-2">최소 ~ 최대</div>
          </div>
          <div className="flex flex-1">
            <div className="flex-1 flex items-center bg-table-head p-2">
              경매결과
            </div>
            <div className="flex-3 flex items-center p-2">진행물건</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="primary">검색하기</Button>
      </div>
    </div>
  );
};

export default SearchTable;
