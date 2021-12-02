class User < ApplicationRecord
  has_secure_password

  validates :password, length: { minimum: 8 }
  validates :name, presence: true, length: {maximum: 20}
  validates :email, presence: true, uniqueness: true
end
