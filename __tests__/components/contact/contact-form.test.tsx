import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/contact/contact-form'

jest.mock('@/app/actions/contact', () => ({
  submitContact: jest.fn().mockResolvedValue({ success: true }),
}))

describe('ContactForm', () => {
  it('renders all required field labels', () => {
    render(<ContactForm />)
    expect(screen.getByText(/your name/i)).toBeInTheDocument()
    expect(screen.getByText(/^email/i)).toBeInTheDocument()
    expect(screen.getByText(/tell us about your project/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send enquiry/i })).toBeInTheDocument()
  })

  it('shows name validation error on submit with empty name', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    await waitFor(() => {
      expect(screen.getByText('Please enter your name')).toBeInTheDocument()
    })
  })

  it('shows email validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/email/i), 'bad-email')
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('shows project type error when none selected on submit', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/your name/i), 'Jane Smith')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    await waitFor(() => {
      expect(screen.getByText('Please select at least one project type')).toBeInTheDocument()
    })
  })

  it('shows success state after valid submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    await user.type(screen.getByLabelText(/your name/i), 'Jane Smith')
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com')
    await user.click(screen.getByRole('button', { name: /web app/i }))
    await user.type(screen.getByLabelText(/tell us about your project/i), 'We need a custom analytics dashboard for our operations team.')
    await user.click(screen.getByRole('button', { name: /send enquiry/i }))
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /message.*received/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /back to home/i })).toBeInTheDocument()
    })
  })
})
