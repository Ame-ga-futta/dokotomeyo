class ApplicationMailer < ActionMailer::Base
  default from: ENV['DOKOTOMEYO_GMAIL']
  layout 'mailer'
end
