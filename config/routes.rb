Rails.application.routes.draw do
  namespace :dokotomeyo do
    get "/",         to: "top#top"
  end
end
