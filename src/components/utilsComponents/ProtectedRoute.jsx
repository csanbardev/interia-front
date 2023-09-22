import { Route, Navigate } from "react-router-dom"

export function ProtectedRoute({ component: Component, hasToken, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        hasToken ? (
          <Component {...props} />
        ) : (
          <Navigate to="login" />
        )
      }
    />
  )
}