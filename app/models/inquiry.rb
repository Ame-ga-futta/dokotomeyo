class Inquiry < ApplicationRecord
  validates :address, presence: true
  validates :message, presence: true
  validates :name, presence: true, length: { maximum: 20 }
end
