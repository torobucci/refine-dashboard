"use client";

import { Card, CardContent, Typography } from "@mui/material";
// import { IconButton } from "@mui/material";
// import { WithdrawIcon, OptionsIcon } from '@mui/icons-material';

export default function IndexPage() {
  return (
    <>
    <Card className="mb-6 shadow-md bg-dark_grey w-full text-white">
      <CardContent className="flex justify-between items-center">
          <div>
            <Typography variant="h5" className="font-semibold">
              Total Earnings
            </Typography>
            <Typography variant="h4">
              <p className="inline-block">
                {" "}
                $12,000 <span className="text-green">15%</span>
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
    </>
  );
}
