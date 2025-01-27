import IconProps from '@/interface/IconProps'

const IconApi = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? '24'} height={props.size ?? '24'} style={props.style} className={props.className} viewBox="0 0 24 24"><rect width="24" height="24" fill="none"/><path fill="currentColor" d="M3.53 21.53a.75.75 0 0 1-1.06-1.06l2.01-2.011c-.774-1.073-.908-2.265-.753-3.29c.178-1.172.743-2.2 1.243-2.7l1.5-1.5a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 0 1 0 1.061l-1.5 1.5c-.5.5-1.527 1.065-2.699 1.243c-1.025.155-2.217.02-3.29-.754zm7.5-11a.75.75 0 1 1-1.06-1.06L11.44 8l-.47-.47a.75.75 0 0 1 0-1.06l1.5-1.5c.5-.5 1.527-1.065 2.699-1.243c1.025-.155 2.217-.02 3.29.754l2.01-2.011a.75.75 0 1 1 1.061 1.06l-2.01 2.012c.774 1.072.91 2.264.754 3.29c-.178 1.171-.743 2.198-1.243 2.698l-1.5 1.5a.75.75 0 0 1-1.06 0l-.47-.47l-1.47 1.47a.75.75 0 1 1-1.06-1.06l1.47-1.47l-2.44-2.44z"/></svg>

  )
}

export default IconApi