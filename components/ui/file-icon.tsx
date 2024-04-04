export function FileIcon({ height = 50, width = 50, type = 'closed' }) {
  switch (type) {
    case 'open':
      return (
        // <svg width="771" height="646" viewBox="0 0 771 646" fill="none" xmlns="http://www.w3.org/2000/svg">
        <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="file">
          <path fill="#ffd599"
            d="M26.71,7.29l-6-6A1,1,0,0,0,20,1H8A3,3,0,0,0,5,4V28a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V8A1,1,0,0,0,26.71,7.29Z"></path>
          <path fill="#e4ab7b"
            d="M20.71 1.29A1 1 0 0 0 20 1H19V7.65A1.36 1.36 0 0 0 20.35 9H27V8a1 1 0 0 0-.29-.71zM21.16 17.25h-10a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2zM21.16 22.25h-10a1 1 0 1 1 0-2h10a1 1 0 0 1 0 2zM21.16 27.25h-10a1 1 0 1 1 0-2h10a1 1 0 0 1 0 2z"></path>
          <path fill="#eef5fd"
            d="M21 17H11a1 1 0 0 1 0-2H21a1 1 0 0 1 0 2zM21 22H11a1 1 0 0 1 0-2H21a1 1 0 0 1 0 2zM21 27H11a1 1 0 0 1 0-2H21a1 1 0 0 1 0 2z"></path>
          <path fill="#d7e2f2"
            d="M21.88 15.54a.9.9 0 0 0-.46-.12h-10a1 1 0 0 0-1 1 .9.9 0 0 0 .12.46A1 1 0 0 1 10 16a1 1 0 0 1 1-1H21A1 1 0 0 1 21.88 15.54zM21.88 20.54a.9.9 0 0 0-.46-.12h-10a1 1 0 0 0-1 1 .9.9 0 0 0 .12.46A1 1 0 0 1 10 21a1 1 0 0 1 1-1H21A1 1 0 0 1 21.88 20.54zM21.88 25.54a.9.9 0 0 0-.46-.12h-10a1 1 0 0 0-1 1 .9.9 0 0 0 .12.46A1 1 0 0 1 10 26a1 1 0 0 1 1-1H21A1 1 0 0 1 21.88 25.54z"></path>
        </svg>
      )
    case 'closed':
      return (
        <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="File">
          <path fill="#de99ff"
            d="M26.71,7.29l-6-6A1,1,0,0,0,20,1H8A3,3,0,0,0,5,4V28a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V8A1,1,0,0,0,26.71,7.29Z"
            className="colorffd599 svgShape"></path>
          <path fill="#c27be4"
            d="M20.71 1.29A1 1 0 0 0 20 1H19V7.65A1.36 1.36 0 0 0 20.35 9H27V8a1 1 0 0 0-.29-.71zM21.16 17.25h-10a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2zM21.16 22.25h-10a1 1 0 1 1 0-2h10a1 1 0 0 1 0 2zM21.16 27.25h-10a1 1 0 1 1 0-2h10a1 1 0 0 1 0 2z"
            className="colore4ab7b svgShape"></path>
          <path fill="#f8eefd"
            d="M21 17H11a1 1 0 0 1 0-2H21a1 1 0 0 1 0 2zM21 22H11a1 1 0 0 1 0-2H21a1 1 0 0 1 0 2zM21 27H11a1 1 0 0 1 0-2H21a1 1 0 0 1 0 2z"
            className="coloreef5fd svgShape"></path>
          <path fill="#c651ff"
            d="M21.88 15.54a.9.9 0 0 0-.46-.12h-10a1 1 0 0 0-1 1 .9.9 0 0 0 .12.46A1 1 0 0 1 10 16a1 1 0 0 1 1-1H21A1 1 0 0 1 21.88 15.54zM21.88 20.54a.9.9 0 0 0-.46-.12h-10a1 1 0 0 0-1 1 .9.9 0 0 0 .12.46A1 1 0 0 1 10 21a1 1 0 0 1 1-1H21A1 1 0 0 1 21.88 20.54zM21.88 25.54a.9.9 0 0 0-.46-.12h-10a1 1 0 0 0-1 1 .9.9 0 0 0 .12.46A1 1 0 0 1 10 26a1 1 0 0 1 1-1H21A1 1 0 0 1 21.88 25.54z"
            className="colord7e2f2 svgShape"></path>
        </svg>
      )
  }
}