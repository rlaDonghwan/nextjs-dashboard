"use client"; // 클라이언트 컴포넌트로 렌더링

import { CustomerField } from "@/app/lib/definitions"; // CustomerField 타입 정의 가져오기
import Link from "next/link"; // Next.js의 Link 컴포넌트 가져오기
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline"; // Heroicons 아이콘 가져오기
import { Button } from "@/app/ui/button"; // Button 컴포넌트 가져오기
import { createInvoice, State } from "@/app/lib/actions"; // createInvoice 함수와 State 타입 가져오기
import { useActionState } from "react"; // useActionState 커스텀 훅 가져오기

export default function Form({ customers }: { customers: CustomerField[] }) {
  // Form 컴포넌트 정의, customers를 props로 받음
  const initialState: State = { message: null, errors: {} }; // 초기 상태 정의
  const [state, formAction] = useActionState(createInvoice, initialState); // useActionState 훅 사용

  return (
    <form action={formAction}>
      {" "}
      {/* form 태그, formAction을 action으로 설정 */}
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {" "}
        {/* 폼 컨테이너 */}
        {/* Customer Name */}
        <div className="mb-4">
          {" "}
          {/* 고객 선택 섹션 */}
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            {" "}
            {/* 고객 선택 레이블 */}
            Choose customer
          </label>
          <div className="relative">
            {" "}
            {/* 드롭다운 컨테이너 */}
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue="" // 기본값 설정
              aria-describedby="customer-error" // 에러 메시지 연결
            >
              <option value="" disabled>
                {" "}
                {/* 기본 선택 옵션 */}
                Select a customer
              </option>
              {customers.map(
                (
                  customer // 고객 목록을 드롭다운 옵션으로 렌더링
                ) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                )
              )}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />{" "}
            {/* 아이콘 */}
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {" "}
            {/* 에러 메시지 표시 */}
            {state.errors?.customerId &&
              state.errors.customerId.map(
                (
                  error: string // 에러 메시지 렌더링
                ) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                )
              )}
          </div>
        </div>
        {/* Invoice Amount */}
        <div className="mb-4">
          {" "}
          {/* 금액 입력 섹션 */}
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            {" "}
            {/* 금액 입력 레이블 */}
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            {" "}
            {/* 입력 필드 컨테이너 */}
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number" // 숫자 입력 필드
                step="0.01" // 소수점 단위 설정
                placeholder="Enter USD amount" // 플레이스홀더 텍스트
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                required // 필수 입력 필드
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />{" "}
              {/* 아이콘 */}
            </div>
          </div>
        </div>
        {/* Invoice Status */}
        <fieldset>
          {" "}
          {/* 송장 상태 설정 섹션 */}
          <legend className="mb-2 block text-sm font-medium">
            {" "}
            {/* 필드셋 제목 */}
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            {" "}
            {/* 상태 선택 컨테이너 */}
            <div className="flex gap-4">
              {" "}
              {/* 상태 선택 옵션 */}
              <div className="flex items-center">
                {" "}
                {/* Pending 상태 */}
                <input
                  id="pending"
                  name="status"
                  type="radio" // 라디오 버튼
                  value="pending" // 값 설정
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" /> {/* 아이콘 */}
                </label>
              </div>
              <div className="flex items-center">
                {" "}
                {/* Paid 상태 */}
                <input
                  id="paid"
                  name="status"
                  type="radio" // 라디오 버튼
                  value="paid" // 값 설정
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" /> {/* 아이콘 */}
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        {" "}
        {/* 버튼 섹션 */}
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel {/* 취소 버튼 */}
        </Link>
        <Button type="submit">Create Invoice</Button> {/* 송장 생성 버튼 */}
      </div>
    </form>
  );
}
