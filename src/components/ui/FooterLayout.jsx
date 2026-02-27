
export const FooterLayout = (props) => {
  return (

    <p variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </p>
  )
}
