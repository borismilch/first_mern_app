import React, { useState, useCallback, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LinkCard from '../components/LinkCard'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const DetailPage = () => {
  const { request, loading, error } = useHttp()
  const [link, setLink] = useState('')
  const linkId = useParams().id

  const {token} = useContext(AuthContext)

  const getLink = useCallback(async () => {
    try {
      const fetched = await request('/api/link/' + linkId, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
    }
    catch (e) {
      console.log(error)
    }
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) { return <Loader /> }
 
  return (
    <>
     { !loading && link && <LinkCard link={link} /> }
    </>
  )
}
