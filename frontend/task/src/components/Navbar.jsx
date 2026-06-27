import{ useState, useEffect } from 'react'
import{ Link, useLocation } from 'react'
import useThemeStore from '../store/Themestore'

const NAV = [
    { label: "About", to:'/about'},
    {label: "Services", to :"/services"},
    {label: "Blog", to : "/blog" },
    { label: "Careers", to:"/careers"},
    {label:"Contact", to:"/contact"},
]
