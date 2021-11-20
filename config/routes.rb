Rails.application.routes.draw do
  root to: redirect('/dokotomeyo')

  namespace :dokotomeyo do
    get   "/",                   to: "top#top"
    get   :post,                 to: "top#top"
    get   :signup,              to: "top#top"
    get   :login,                to: 'top#top'

    post  :login,                to: 'sessions#login'
    get  :logout,               to: 'sessions#logout'
  end
end
