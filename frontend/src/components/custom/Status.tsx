const COLOR_SHADES = {
  NARVIK_PALE_GREEN: "#F0FDF4",
  FOREST_DEEP_GREEN: "#067806",
  CHABLIS_PALE_RED: "#FEF2F2",
  THUNDERBIRD_DEEP_RED: "#B91C1C",
  IRON_LIGHT_GRAY: "#D4D4D4",
  WOODSMOKE_DEEP_GRAY: "#171717",
}

type StatusProps = {
  [key: string]: {
    statusText: string
    textColor: string
    backgroundColor: string
    borderColor: string // Note: Reuse backgroundColor as borderColor if border is not obvious!
  }
}

const statusProps: StatusProps = {
  invited: {
    statusText: "invited",
    textColor: COLOR_SHADES["WOODSMOKE_DEEP_GRAY"],
    backgroundColor: "white",
    borderColor: COLOR_SHADES["IRON_LIGHT_GRAY"],
  },
  active: {
    statusText: "active",
    textColor: COLOR_SHADES["FOREST_DEEP_GREEN"],
    backgroundColor: COLOR_SHADES["NARVIK_PALE_GREEN"],
    borderColor: COLOR_SHADES["NARVIK_PALE_GREEN"],
  },
  inactive: {
    statusText: "inactive",
    textColor: COLOR_SHADES["THUNDERBIRD_DEEP_RED"],
    backgroundColor: COLOR_SHADES["CHABLIS_PALE_RED"],
    borderColor: COLOR_SHADES["CHABLIS_PALE_RED"],
  },
  unknown: {
    statusText: "unknown",
    textColor: COLOR_SHADES["IRON_LIGHT_GRAY"],
    backgroundColor: "white",
    borderColor: COLOR_SHADES["IRON_LIGHT_GRAY"],
  },
}

export default function Status({ value, className }: { value: string; className?: string }) {
  const { statusText, textColor, backgroundColor, borderColor } =
    statusProps[value?.toLocaleLowerCase()] ?? statusProps["unknown"]

  return (
    <div>
      <span
        className={`${className} rounded-2xl border px-3 py-1 capitalize`}
        style={{
          color: textColor,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
        }}
      >
        {statusText}
      </span>
    </div>
  )
}
