class User < ApplicationRecord
  has_secure_password

  validates :password, length: { minimum: 8 }, on: :create
  validates :password, length: { minimum: 8 }, allow_nil: true, on: :update
  validates :name, presence: true, length: { maximum: 20 }
  validates :email, presence: true, uniqueness: true

  has_many :favorites, dependent: :destroy
  has_many :comments, dependent: :destroy
end
