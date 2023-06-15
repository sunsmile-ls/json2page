import render from '@sunsmile/lower-code'
const RenderComp: React.FC<{ schema: any }> = (props) => {
  const { schema } = props
  return render(schema)
}

export default RenderComp
