const regex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

type Options = {
  required?: boolean
}

export const validateEmail = (
  email: string,
  options?: Options
): { ok: true; email: string } | { ok: false; error: string } => {
  if (options?.required && email.length === 0) {
    return { ok: false, error: 'Required' }
  }

  if (!email.match(regex)) {
    return { ok: false, error: 'Invalid email' }
  }

  return { ok: true, email: email }
}
