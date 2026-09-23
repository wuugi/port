import type { Metadata } from "next";
import PortfolioV1 from "@/components/v1/PortfolioV1";

export const metadata: Metadata = {
  title: "김현욱 포트폴리오 | AX Manager",
  description:
    "조직의 문제와 니즈를 구조화해 AI 자동화 시스템을 설계·구현·운영해온 AX Manager 김현욱의 포트폴리오입니다.",
};

export default function AxmPage() {
  return <PortfolioV1 variant="axm" />;
}
