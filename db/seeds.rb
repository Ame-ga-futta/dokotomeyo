User.create(
  id: 1,
  name: 'Administrator',
  email: ENV['ADMIN_EMAIL'],
  password: ENV['ADMIN_PASSWORD'],
  password_confirmation: ENV['ADMIN_PASSWORD'],
  admin: true,
)

User.create(
  id: 2,
  name: 'ゲストユーザー',
  email: ENV['GUEST_EMAIL'],
  password: ENV['GUEST_PASSWORD'],
  password_confirmation: ENV['GUEST_PASSWORD'],
  admin: true,
)
