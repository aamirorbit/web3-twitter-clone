export default function SidebarMenuItem({text, Icon, active}) {
  return (
    <div className="side-bar-item">
      <Icon className="h-7"/>
      <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>
    </div>
  )
}
