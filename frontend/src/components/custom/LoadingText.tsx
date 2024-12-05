import { LoaderCircle } from "lucide-react"

type Props = {
  text: string
  className?: string
}

export default function LoadingText({ className, text }: Props) {
  return (
    <div className={`${className} flex items-center justify-center gap-2`}>
      <LoaderCircle className="animate-spin" height={10} width={10} />
      <span>{text}</span>
    </div>
  )
}
