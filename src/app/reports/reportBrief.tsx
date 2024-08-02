"use client";
import React, { useState } from "react";
import reportData from "@/app/reports/report";
import { SlArrowRight } from "react-icons/sl";
import Link from "next/link";

const ReportBrief: React.FC = () => {
  const [clickedReports, setClickedReports] = useState<string[]>([]);

  const handleClick = (reportName: string) => {
    if (!clickedReports.includes(reportName)) {
      setClickedReports([...clickedReports, reportName]);
    }
  };

  return (
    <div>
      {reportData.map((report, index) => (
        <div
          key={index}
          className="border-b border-gray-200 py-4 "
          onClick={() => handleClick(report.reportName)}
          style={{
            fontWeight: clickedReports.includes(report.reportName)
              ? "normal"
              : "bold",
          }}
        >
          <div>
            <h2 className="text-md">{report.reportName}</h2>
            <p className="text-sm">{report.reportDate}</p>
          </div>
          <Link href="/report-view">
            <button className="flex gap-5 items-center">
              <p className="font-bold text-sm">New Message</p>
              <SlArrowRight />
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ReportBrief;
