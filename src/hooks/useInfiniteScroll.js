import { useCallback, useEffect, useState } from 'react'

const useInfiniteScroll = (fetchMoreData, containerRef) => {
  const [page, setPage] = useState(1)

  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollTop, clientHeight, scrollHeight } = container
    if (scrollTop + clientHeight >= scrollHeight - 8) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [containerRef])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll)

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [containerRef, handleScroll])

  useEffect(() => {
    fetchMoreData(page)
  }, [fetchMoreData, page])

  return { page }
}

export default useInfiniteScroll
