import { Stack } from '@mui/material'
import { GoHome } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <Stack 
    flexDirection={'row'}
    maxWidth={'100%'}
    justifyContent={'space-around'}
    >
        <Link to={'/'}>
        <GoHome size={32}/>
        </Link>
        <Link to={'/search'}>
        <IoIosSearch size={32}/>
        </Link>
        <Link to={'/edit'}>
        <TbEdit size={32}/>
        </Link>
        <CiHeart size={32}/>
        <Link to={'/profile/threads/1'}>
        <RxAvatar size={32}/>
        </Link>
    </Stack>
    </>
  )
}

export default Navbar