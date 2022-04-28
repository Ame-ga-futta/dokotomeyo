Rails.application.routes.draw do
  root to: redirect('/dokotomeyo')

  namespace :dokotomeyo do
    get    "/",                         to: "top#top"
    get    :mypage,                     to: "top#top"
    get    :post,                       to: "top#top"
    get    :signup,                     to: "top#top"
    get    :login,                      to: "top#top"
    get    :delete,                     to: "top#top"
    get    "/parking/:id",              to: "top#top"
    get    "/detail/:id",               to: "top#top"
    get    :admin,                      to: "top#top"

    post   :signup,                     to: 'sessions#signup'
    post   :login,                      to: 'sessions#login'
    delete :logout,                     to: 'sessions#logout'
    delete :delete,                     to: 'sessions#delete'

    get    :profile,                    to: 'users#get_profile'
    get    :username,                   to: 'users#get_username'
    post   :update_name,                to: 'users#update_name'
    post   :update_email,               to: 'users#update_email'
    post   :update_password,            to: 'users#update_password'

    get    :favorite_from_user,         to: 'favorite#get_favorite_from_user'
    get    :favorite_from_parking,      to: 'favorite#get_favorite_from_parking'
    get    :favorite_match,             to: 'favorite#get_favorite_match'
    post   :post_favorite,              to: 'favorite#post_favorite'
    delete :delete_favorite,            to: 'favorite#delete_favorite'

    get    :comment_from_user,          to: 'comment#get_comment_from_user'
    get    :comment_from_parking,       to: 'comment#get_comment_from_parking'
    post   :post_comment,               to: 'comment#post_comment'
    delete :delete_comment,             to: 'comment#delete_comment'

    post   :new_confirm,                to: 'parkings#new_confirm'
    post   :new_create,                 to: 'parkings#new_create'
    post   :add_confirm,                to: 'parkings#add_confirm'
    post   :add_create,                 to: 'parkings#add_create'
    post   :edit_confirm,               to: 'parkings#edit_confirm'
    post   :edit_create,                to: 'parkings#edit_create'
    post   :search,                     to: 'parkings#search'
    get    :details,                    to: 'parkings#details'

    get    :inquiry,                    to: 'inquiry#get_inquiry'
    post   :inquiry,                    to: 'inquiry#post_inquiry'

    get    :authenticate,               to: 'admin#authenticate'
    get    :admin_user,                 to: 'admin#get_users'
    get    :admin_parking,              to: 'admin#get_parkings'
    get    :admin_requirementFree,      to: 'admin#get_requirement_frees'
    get    :admin_requirementBuy,       to: 'admin#get_requirement_buys'
    get    :admin_requirementFacility,  to: 'admin#get_requirement_facilities'
    get    :admin_requirementTime,      to: 'admin#get_requirement_times'
    get    :admin_comment,              to: 'admin#get_comments'
    get    :admin_favorite,             to: 'admin#get_favorites'
    delete :admin_user,                 to: 'admin#delete_user'
    delete :admin_parking,              to: 'admin#delete_parking'
    delete :admin_requirementFree,      to: 'admin#delete_requirement_free'
    delete :admin_requirementBuy,       to: 'admin#delete_requirement_buy'
    delete :admin_requirementFacility,  to: 'admin#delete_requirement_facility'
    delete :admin_requirementTime,      to: 'admin#delete_requirement_time'
    delete :admin_comment,              to: 'admin#delete_comment'
    delete :admin_favorite,             to: 'admin#delete_favorite'
  end
end
