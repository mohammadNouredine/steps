import React from "react";
import { Tooltip, TooltipProps, Whisper } from "rsuite";

function ToolTipWrapper({
  children,
  toolTip,
  placement = "auto",
  trigger = "hover",
}: {
  children: React.ReactNode;
  toolTip?: string;
  placement?: TooltipProps["placement"];
  trigger?: "hover" | "click" | "focus" | "active" | "none";
}) {
  if (!toolTip) {
    return children;
  }
  return (
    <Whisper
      placement={placement}
      trigger={trigger}
      speaker={<Tooltip>{toolTip}</Tooltip>}
    >
      {children}
    </Whisper>
  );
}

export default ToolTipWrapper;
