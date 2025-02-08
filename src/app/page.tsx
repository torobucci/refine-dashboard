"use client";

import { Card, CardContent, Typography } from "@mui/material";
// import { IconButton } from "@mui/material";
// import { WithdrawIcon, OptionsIcon } from '@mui/icons-material';
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import RecentActivity from "@components/recentActivity";

export default function IndexPage() {
  return (
    <>
      <Card className="mb-6 shadow-md bg-dark_grey w-full text-white">
        <CardContent className="flex justify-between items-center">
          <div>
            <Typography variant="h6" className="font-semibold">
              Total Earnings
            </Typography>
            <Typography variant="h6">
              <p className="inline-block">
                {" "}
                $12,000
                <span className="text-green text-sm mx-2">15% </span>
                <span className="text-green text-[2px]">
                  <ArrowOutwardIcon />
                </span>
              </p>
            </Typography>
          </div>
          <div>
            {/* <IconButton aria-label="withdraw">
              <WithdrawIcon className="text-white" />
            </IconButton>
            <IconButton aria-label="options">
              <OptionsIcon className="text-white" />
            </IconButton> */}
          </div>
        </CardContent>
      </Card>
      <Card>
        <RecentActivity />
      </Card>
    </>
  );
}
