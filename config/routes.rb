Rails.application.routes.draw do
  root to: redirect('/dokotomeyo')

  namespace :dokotomeyo do
    get    "/",                   to: "top#top"
    get    :mypage,               to: "top#top"
    get    :post,                 to: "top#top"
    get    :signup,               to: "top#top"
    get    :login,                to: "top#top"

    post   :signup,               to: 'sessions#signup'
    post   :login,                to: 'sessions#login'
    delete :logout,               to: 'sessions#logout'
  end
end
