import React from "react"
import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import BackOfficeItems from "../src/components/BackOfficeItems"

const mockStore = configureStore([])

describe("BackOfficeItems", () => {
  let store

  test("renders BackOfficeItems component", () => {
    render(
      <Provider store={store}>
        <BackOfficeItems />
      </Provider>
    )

    expect(screen.getByText(/Search an article/i)).toBeInTheDocument()
  })
})
