import Link from "next/link"

type UnderlineLinkProps = {
    href: string
    children: string
}

export function UnderlineLink({ href, children }: UnderlineLinkProps) {
    return (
        <Link href={href} className="relative after:bottom-0 after:left-1/2 hover:after:left-0 after:absolute after:bg-blue-500 w-fit after:w-0 hover:after:w-full after:h-px text-blue-500 text-sm after:transition-all after:duration-500">
            {children}
        </Link>
    )
}