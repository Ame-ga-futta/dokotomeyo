FactoryBot.define do
  factory :edit_param do
    params do
      "{
        \"parking\":{
          \"id\":1,
          \"name\":\"sample\",
          \"address\":\"sample\",
          \"latitude\":35.6995,
          \"longitude\":139.412,
          \"beginning_of_worktime\":\"00:00\",
          \"end_of_worktime\":\"23:59\",
          \"created_at\":\"2022-04-25T02:52:52.332+09:00\",
          \"updated_at\":\"2022-04-25T02:52:52.332+09:00\"
        },
        \"requirement_buy\":{},
        \"requirement_facility\":{
          \"1\":{
            \"delete\":false,
            \"requirements\":{\"facility_name\":\"パーク\",\"free_time\":\"01:00\",\"only_weekdays\":false}
          }
        },
        \"requirement_free\":{},
        \"requirement_time\":{}
      }"
    end
  end
end
