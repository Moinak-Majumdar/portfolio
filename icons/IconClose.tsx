import IconProps from '@/interface/IconProps'

const IconClose = (props: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={props.size ?? '24'} style={props.style} className={props.className} height={props.size ?? '24'} viewBox="0 0 24 24"><path fill="currentColor" d="M14.59 8L12 10.59L9.41 8L8 9.41L10.59 12L8 14.59L9.41 16L12 13.41L14.59 16L16 14.59L13.41 12L16 9.41zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8"></path></svg>
  )
}

export default IconClose