Rails.application.routes.draw do
  namespace :dokotomeyo do
    get "/",                      to: "top#top"
    get :sign_up,                 to: "top#sign_up_form"
    get :login,              to: "top#login_form"
    get :post,               to: "top#post_form"
    get :about,                   to: "top#about"
  end
end
