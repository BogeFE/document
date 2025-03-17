type Keys = 'option1' | 'option2'
type Flags = { [K in Keys]: boolean }
const flags: Flags = {
  option1: true,
  option2: false,
}

interface PageInfo {
  title: string
}
type Page = 'home' | 'about' | 'contact'

const nav: Record<Page, PageInfo> = {
  home: { title: 'Home' },
  about: { title: 'About' },
  contact: { title: 'Contact' },
}

type B = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // "c"
