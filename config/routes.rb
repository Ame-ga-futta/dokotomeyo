Rails.application.routes.draw do
  namespace :dokotomeyo do
    get   "/",                   to: "top#top"
    get   :post,                 to: "top#post_form"
    get   :sign_up,              to: "top#sign_up_form"

    get   :login,                to: 'sessions#login_form'
    post  :login,                to: 'sessions#login'
    get  :logout,               to: 'sessions#logout'
  end
end
