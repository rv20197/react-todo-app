import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
        <h3>Oops!</h3>
        <p>Sorry, found some error.</p>
        <p>
            <i>{error.status}, {error.statusText}</i>
        </p>
    </div>
  )
}
